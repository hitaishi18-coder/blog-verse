import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state?.auth?.userData);

  if (!userData) {
    return (
      <p className="text-center text-red-500 py-10">
        Please log in to create or edit a post.
      </p>
    );
  }

  //  Submit function (cleaned & correct)
  const submit = async (data) => {
    try {
      //  Clean content: remove empty <p>&nbsp;</p> or whitespace-only paragraphs
      const cleanedContent = data.content.replace(/<p>(&nbsp;|\s)*<\/p>/g, "");

      if (post) {
        // --- Updating existing post ---
        const file = data.image?.[0] || null;

        const updatedPost = await appwriteService.updatePost(post.$id, {
          title: data.title,
          content: cleanedContent,
          status: data.status,
          imageFile: file,
        });

        if (updatedPost) navigate(`/post/${updatedPost.$id}`);
      } else {
        // --- Creating new post ---
        const file = data?.image?.[0];

        if (!file) {
          alert("Please upload a featured image!");
          return;
        }

        const createdPost = await appwriteService.createPost({
          title: data.title,
          content: cleanedContent,
          imageFile: file,
          status: data.status,
          userid: userData.$id,
        });

        if (createdPost) navigate(`/post/${createdPost.$id}`);
      }
    } catch (error) {
      console.error(" Post submission error:", error);
      alert(error.message || "Something went wrong!");
    }
  };

  // Slug generator
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  //  Automatically update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Enter title"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug :"
          placeholder="Auto-generated slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />

        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-lg shadow"
            />
          </div>
        )}

        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />

        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;

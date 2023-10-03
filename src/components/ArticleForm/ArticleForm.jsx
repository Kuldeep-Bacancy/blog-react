import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import { useNavigate } from "react-router-dom";
import articleService from "../../services/article";

export default function ArticleForm({ article }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: article?.attributes?.title || "",
      slug: article?.attributes?.slug || "",
      content: article?.attributes?.content || ""
    },
  });

  const navigate = useNavigate();

  const submit = async (data) => {
    if (article) {
      const response = await articleService.updateArticle(data, article.id)

      if (response.status_code === 200) {
        navigate(`/article/${response.data.id}`);
      }
    } else {
      const response = await articleService.createArticle(data)

      if (response.status_code === 200) {
        navigate(`/article/${response.data.id}`);
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
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
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image")}
        />
        {article && (
          <div className="w-full mb-4">
            <img
              src={article?.attributes?.image}
              alt={article?.attributes?.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Button type="submit" bgColor={article ? "bg-green-500" : undefined} className="w-full">
          {article ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

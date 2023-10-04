import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE } from "..";
import { useNavigate } from "react-router-dom";
import articleService from "../../services/article";
import ErrorMessage from "../ErrorMessage";

export default function ArticleForm({ article }) {
  const { register, handleSubmit, watch, setValue, control, getValues, formState } = useForm({
    defaultValues: {
      title: article?.attributes?.title || "",
      slug: article?.attributes?.slug || "",
      content: article?.attributes?.content || ""
    },
  });

  const { errors } = formState;

  const navigate = useNavigate();

  const submit = async (data) => {
    if (article) {
      const newData = { ...data, image: data.image[0] }
      const response = await articleService.updateArticle(newData, article.id)

      if (response.status_code === 200) {
        navigate(`/article/${response.data.id}`);
      }
    } else {
      const newData = { ...data, image: data.image[0]}
      const response = await articleService.createArticle(newData)

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
          {...register("title", { required: "Title is required!" })}
        />
        <ErrorMessage message={ errors.title?.message } />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: "Slug is required!" })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
          }}
        />
        <ErrorMessage message={errors.slug?.message} />
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
              src={article?.attributes?.image || "https://images.unsplash.com/photo-1586943759341-be5595944989?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1MDE1MDB8MHwxfHNlYXJjaHwyNHx8YXJ0aWNsZXxlbnwwfHx8fDE2OTYzOTQxNTN8MA&ixlib=rb-4.0.3&q=85"}
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

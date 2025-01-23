"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { Schema } from "../../../amplify/data/resource";

export async function deleteComment(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) return;
  const { data: deletedComment } =
    await cookieBasedClient.models.Comment.delete({ id });

  revalidatePath(`/posts/${id}`);

  console.log("deleted", deletedComment);
}

export async function addComment(content: string, paramsId: string) {
  if (content.trim().length === 0) return;
  const { data: comment } = await cookieBasedClient.models.Comment.create({
    content,
    postId: paramsId,
  });
  console.log("got comment", comment);
  revalidatePath(`/posts/${paramsId}`);
}

export async function onDeletePost(id: string) {
  const { data, errors } = await cookieBasedClient.models.Post.delete({ id });

  console.log("data deleted", data, errors);
  revalidatePath("/");
}

// export async function createPost(formData: any){

//     console.log(JSON.stringify(formData));

//     const {data} = await cookieBasedClient.models.Post.create({
//         title: formData.get("title")?.toString() || "",

//     });
//     console.log('create post data',data)
//     revalidatePath("/");
// }

export async function createPost(formData: FormData) {
  const title = formData.get("title1");
  console.log("Title:", title);

  if (title === null) {
    console.log("title is null");
    return;
  }

  console.log(title.toString());

  const { data, errors } = await cookieBasedClient.models.Post.create({
    title: title.toString(),
  });

  console.log(errors);

  console.log("create post data", data);
  revalidatePath("/");

  // For debugging
  // Add logic to handle the data
}

import React from "react";
import { Schema } from "@/../amplify/data/resource";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { addComment, deleteComment } from "@/app/_actions/actions";
import AddComment from "@/components/AddComment";

export default async function Posts({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: postId } = await params;

  const isSignedIn = await isAuthenticated();

  const { data: post, errors } = await cookieBasedClient.models.Post.get(
    {
      id: postId,
    },
    {
      authMode: "userPool",
      selectionSet: ["id", "title"],
    }
  );

  console.log(errors);

  const { data: allComments, errors: commentErrors } =
    await cookieBasedClient.models.Comment.list({
      authMode: "userPool",
      selectionSet: ["content", "post.id", "id"],
    });

  console.log(allComments);
  console.log(commentErrors);

  const comments = allComments?.filter((comment) => comment.post.id === postId);

  if (post === null) {
    return (
      <>
        <div>error no hay posts</div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold"> Post Information:</h1>
      <div className="border rounded w-1/2 m-auto bg-gray-200 p-4">
        <h2>Title: {post?.title}</h2>
      </div>

      {isSignedIn ? (
        <AddComment addComment={addComment} paramsId={postId} />
      ) : null}

      <h1 className="text-xl font-bold">Comments:</h1>
      {comments.map((comment, idx) => (
        <div key={idx}>
          <div className="w-96 p-2 rounded border bg-yellow-100 flex justify-between">
            <div>{comment.content}</div>
            <form action={deleteComment}>
              <input type="hidden" name="id" id="id" value={comment.id} />
              {isSignedIn ? (
                <button type="submit" className="text-red-950">
                  X
                </button>
              ) : null}
            </form>
          </div>
        </div>
      ))}
    </div>
  );
}

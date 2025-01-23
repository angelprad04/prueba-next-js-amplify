import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeletePost } from "@/app/_actions/actions";

export const dynamic = "force-dynamic";
export default async function Home() {
  console.log(cookieBasedClient.models);

  const isSignedIn = await isAuthenticated();
  const { data: posts } = await cookieBasedClient.models.Post.list({
    selectionSet: ["title", "id"],
    authMode: isSignedIn ? "userPool" : "identityPool",
  });
  console.log("posts", posts);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl">Hello world</h1>
        {posts?.map(async (post, idx) => (
          <Post
            onDelete={onDeletePost}
            post={post}
            key={idx}
            isSignedIn={isSignedIn}
          />
        ))}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}

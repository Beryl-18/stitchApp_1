import StitchCard from "@/components/cards/StitchCard";
import { fetchPosts } from "@/lib/actions/Stitch.actions";
import { currentUser } from "@clerk/nextjs";


export default async function home() {
  const results = await fetchPosts(1,30);
  const user = await currentUser();

  console.log(results);

  
  return (
    <>
      <h1 className="head-text text-left ">
        Home
      </h1>

      <section className="mt-9 flex flex-col gap-10">
        {results.posts.length === 0 ? 
          (<p className="no-result">No posts found</p>)
          :
          (
            <>
            {results.posts.map((post) =>(
              <StitchCard 
                key={post._id}
                id={post._id}
                currentUserId = {user.id}
                parentId = {post.parentId}
                content = {post.text}
                // author = {post.author}
                community = {post.community}
                // createdAt = {post.createdAt}
                comments = {post.children} 
              />
              
              )
            )}
            </>
          ) 
        }
      </section>
    </>
  )
}
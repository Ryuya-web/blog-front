import fs from "fs"
import path from "path"
import Layout from "../../components/Layout"
import { listContentFiles, readContentFile } from "../../lib/content-loader"
export default function Post(post) {
  const blog = post.post.data
  return (
    <Layout title="">
      <div className="md:w-6/12 w-9/12 mt-20 mx-auto">
      <div className="post-title text-3xl">
        <span>{blog.title}</span>
      </div>
      <div className="post-meta">
        <span>{blog.created_at}</span>
      </div>
      <div className="border-blue-300 border-2 mr-auto ml-auto  mt-2"></div>
      <div className="post-body mt-10 text-xl"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
      </div>
      <div>
      </div>
    </Layout>
  )
}
/**
 * ページコンポーネントで使用する値を用意する
 */
/**
 * 有効な URL パラメータを全件返す
 */
export async function getStaticPaths() {
  const paths = listContentFiles({ fs })
    .map((filename) => ({
      params: {
        slug: path.parse(filename).name,
      }
    }))
  return { paths, fallback: false }
}

export async function getStaticProps(context) {
  const res = await fetch(`https://koddaku-backend.herokuapp.com/api_posts/5`)
  const data = await res.json()
  const post = JSON.parse(JSON.stringify(data));
  console.log(post.data.title);
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post }, // will be passed to the page component as props
  }
}
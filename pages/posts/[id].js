import path from "path"
import Layout from "../../components/Layout"
import remark from 'remark'
import html from 'remark-html'
export default function Post(post) {
  const blog = post.post
  console.log(blog);
  return (
    <Layout title="">
      <div className="md:w-6/12 w-9/12 mt-20 mx-auto">
      <div className="post-title text-3xl">
        <span>{blog.title}</span>
      </div>
      <div className="post-meta">
        <span>{blog.created_at_to_jp}</span>
      </div>
      <div className="border-blue-300 border-2 mr-auto ml-auto  mt-2"></div>
      <div className="post-body mt-10 text-xl"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      </div>
      <div>
      </div>
    </Layout>
  )
}

const markdownToHtml = async (markdown) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

/**
 * 有効な URL パラメータを全件返す
 */
 export const getStaticPaths = async () => {
  // 外部APIエンドポイントを呼び出しデータ取得
  const res = await fetch("https://koddaku-backend.herokuapp.com/api_posts/")
  const posts = await res.json()  
  const blogs = posts

  // 事前ビルドしたいパスを指定
  const paths = blogs.map((blog) => ({
    params: {
      // ファイル名と合わせる ※文字列指定
      id: blog.id.toString(),
    },
  }))
  // paths：事前ビルドするパス対象を指定するパラメータ
  // fallback：事前ビルドしたパス以外にアクセスしたときのパラメータ true:カスタム404Pageを表示 false:404pageを表示
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://koddaku-backend.herokuapp.com/api_posts/${params.id}`)
  const data = await res.json()
  const post = JSON.parse(JSON.stringify(data));
  const content = await markdownToHtml((post.content) || '')
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { post,content }, // will be passed to the page component as props
  }
}
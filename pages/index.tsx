import fs from "fs"
import Link from "next/link"
import Layout from "../components/Layout"
import { readContentFiles } from "../lib/content-loader"
import { GetStaticProps } from 'next'
import {GithubIcon,TwitterIcon,EmailIcon,ProfileIcon} from "../components/icons"
export default function Home(props) {
  const { posts, hasArchive } = props

  return (
    <Layout title="">
      <div>
      <Link href="/about" aria-label="About">
      <img src="/images/profile.png" width={200} height={200} className="mt-20 mx-auto rounded-full" alt="profile"/>
      </Link>
      <Link href="/about">
      <h2 className="text-center text-3xl mr-3">コダック</h2>
      </Link>
      <div className="flex justify-center">
      <div className="mr-4 mt-3">
      <ProfileIcon href="https://github.com/Ryuya-web" aria-label="github">
      <GithubIcon size={80} />
      </ProfileIcon>
      </div>
      <div className="mr-5">
      <ProfileIcon href="https://twitter.com/kodakku_0617" aria-label="twitter">
      <TwitterIcon size={80}/>
      </ProfileIcon>
      </div>
      <div className="mr-5 mt-1">
      <ProfileIcon href="/contact">
      <EmailIcon size={70}/>
      </ProfileIcon>
      </div>
      </div>
      <h2 className="text-center text-5xl mr-3 mt-5">Blog</h2>
      <div>
      <div className="border-blue-400 border-2 w-16 mr-auto ml-auto  mt-7"></div>
      </div>
      {posts.map((post) => <div
        key={post.slug}
        className="h-auto"
      >
        <div className="md:w-4/12 text-center md:h-96 h-80 border-light-blue-500 mx-auto border-4 mt-20 w-9/12  rounded-lg  border-opacity-75 shadow-xl">
        <Link href="/posts/[id]" as={`/posts/${post.slug}`}><a>
        <img src={post.images} className="w-9/12  md:h-60 mt-3 h-44 mx-auto" alt="image" />
        <div className="text-3xl mt-6">{post.title}</div>
        <div className="mt-2"><span>{post.published}</span></div>
        </a></Link>
        </div>
      </div>)}
      {hasArchive ? (
        <div className="home-archive text-red-200">
          <Link href="/archive/[page]" as="/archive/1"><a>アーカイブ</a></Link>
        </div>
      ) : ``}
      </div>
    </Layout>
  )
}
/**
 * ページコンポーネントで使用する値を用意する
 */
export const getStaticProps: GetStaticProps = async({ params })  => {
  const MAX_COUNT = 5
  const posts = await readContentFiles({ fs })
  const hasArchive = posts.length > MAX_COUNT
  console.log(posts);
  return {
    props: {
      posts: posts.slice(0, MAX_COUNT),
      hasArchive,
    }
  }
}

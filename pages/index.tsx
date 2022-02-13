import fs from "fs"
import Link from "next/link"
import Layout from "../components/Layout"
import axios from "axios";
import { GetStaticProps } from 'next'
import {GithubIcon,TwitterIcon,EmailIcon,ProfileIcon} from "../components/icons"
export default function Home(props) {
  const { posts } = props
  const names = posts.map(post => post.thumbnail_image)
  console.log(posts);
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
        key={post.id}
        className="h-auto"
      >
        <div className="md:w-4/12 text-center md:h-96 h-80 border-light-blue-500 mx-auto border-4 mt-20 w-9/12  rounded-lg  border-opacity-75 shadow-xl">
        <Link href="/posts/[id]" as={`/posts/${post.id}`}><a>
        <img src={post.thumbnail_image_url} className="w-9/12  md:h-60 mt-3 h-44 mx-auto" alt="image" />
        <div className="text-3xl mt-6">{post.title}</div>
        <div className="mt-2"><span>{post.created_at_to_jp}</span></div>
        </a></Link>
        </div>
      </div>)}
      </div>
    </Layout>
  )
}
/**
 * ページコンポーネントで使用する値を用意する
 */
 export async function getStaticProps(context) {
  const res = await axios.get(`https://koddaku-backend.herokuapp.com/api_posts`)
  const data = res.data
  const posts = JSON.parse(JSON.stringify(data));
  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: { posts }, // will be passed to the page component as props
  }
}

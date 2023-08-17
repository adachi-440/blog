// pages/index.js

import Link from 'next/link';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from 'lib/client';
import type { Blog } from 'types/blog';

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: blog.contents,
    },
  };
};

// Props（blogsとtags）の型
type Props = {
  blogs: Blog[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs }: Props) => {
  return (
    <div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

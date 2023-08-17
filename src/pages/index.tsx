// pages/index.js

import Link from 'next/link';
import type { InferGetStaticPropsType, NextPage } from 'next';
import { client } from 'lib/client';
import type { Blog } from 'types/blog';
import Image from 'next/image';

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog' });

  return {
    props: {
      blogs: blog.contents,
    },
  };
};

type Props = {
  blogs: Blog[];
};

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blogs }: Props) => {
  return (
    <div>
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:mx-0'>
            <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              From the blog
            </h2>
            <p className='mt-2 text-lg leading-8 text-gray-600'>
              Learn how to grow your business with our expert advice.
            </p>
          </div>
          <div className='mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
            <article className='flex max-w-xl flex-col items-start justify-between'>
              <div className='flex items-center gap-x-4 text-xs'>
                <time dateTime='2020-03-16' className='text-gray-500'>
                  Mar 16, 2020
                </time>
              </div>
              <div className='group relative'>
                <h3 className='mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600'>
                  <a href='#'>
                    <span className='absolute inset-0'></span>
                    Boost your conversion rate
                  </a>
                </h3>
                <p className='mt-5 line-clamp-3 text-sm leading-6 text-gray-600'>
                  Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non
                  aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur
                  nulla deserunt vel. Iusto corrupti dicta.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

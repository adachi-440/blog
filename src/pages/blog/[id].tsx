import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { client } from 'lib/client';
import type { Blog } from 'types/blog';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import cheerio from 'cheerio';
import hljs from 'highlight.js';
import 'highlight.js/styles/hybrid.css';

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: 'blog' });

  const paths = data.contents.map((content: Blog) => `/blog/${content.id}`);
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const id = context.params?.id;
  const blog = await client.get({ endpoint: 'blog', contentId: id });
  const $ = cheerio.load(blog.body);
  $('pre code').each((_, elm) => {
    const result = hljs.highlightAuto($(elm).text());
    $(elm).html(result.value);
    $(elm).addClass('hljs');
  });

  return {
    props: {
      blog,
      highlightedBody: $.html(),
    },
  };
};

type Props = {
  blog: Blog;
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ blog }: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>

      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  );
};

export default BlogId;

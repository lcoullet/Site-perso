import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: any) {
  const posts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? !data.draft : true;
  });

  // Sort posts by date descending
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const siteUrl = context.site || new URL("https://ludovic.coullet.net");
  const feedUrl = new URL("/rss.xml", siteUrl).toString();

  return rss({
    title: "Blog de Ludovic Coullet",
    description: "Pensées, retours d’expérience et guides pratiques sur le développement web et la création sonore.",
    site: siteUrl,
    xmlns: {
      atom: "http://www.w3.org/2005/Atom",
    },
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.categories,
    })),
    customData: `<language>fr-fr</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />`,
  });
}

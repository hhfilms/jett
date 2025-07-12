import Link from "next/link";
import Image from "next/image";
import {useSanityData} from "@/context/SanityDataContext";

export default function Articles() {
  const {articles} = useSanityData();
  return (
    <main className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white rounded overflow-hidden shadow-lg">
            <div className="relative w-full h-52">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
              <span className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-3 py-1 rounded">{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="p-4">
              <Link href={article.url} target="_blank" rel="noopener noreferrer">
                <h2 className="text-lg font-bold text-gray-900 hover:underline">{article.title}</h2>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

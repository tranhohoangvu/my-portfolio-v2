import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getProjectNeighbours, projects } from "@/data/projects";
import { projectJsonLd, projectMetadata } from "@/lib/seo";
import { isLang } from "@/lib/nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CustomCursor } from "@/components/CustomCursor";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ActionDock } from "@/components/ActionDock";
import { ProjectDetail } from "@/components/work/ProjectDetail";

/** Dung san 2 x 10 trang tinh /[lang]/work/[slug] luc build */
export function generateStaticParams() {
  return ["vi", "en"].flatMap((lang) =>
    projects.map((project) => ({ lang, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/work/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  return projectMetadata(slug, isLang(lang) ? lang : "vi");
}

export default async function LangProjectPage({
  params,
}: PageProps<"/[lang]/work/[slug]">) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(slug);
  const jsonLd = projectJsonLd(slug, lang);

  return (
    <>
      <ScrollProgress />
      <CustomCursor />
      <Header instant />

      <main id="main" className="flex-1">
        {jsonLd ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        ) : null}
        <ProjectDetail project={project} prev={prev} next={next} />
      </main>

      <Footer />
      <ActionDock />
    </>
  );
}

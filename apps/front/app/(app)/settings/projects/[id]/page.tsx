import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  PageHeader,
} from '@/components/server.index';

export default function ProjectPage({ params }: { params: { id: string } }) {
  // const {} = useGetProject({ id: 'id' })

  return (
    <section className="space-y-12">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/settings/projects">Projets</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Projet ...</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PageHeader title="Page projet" hasSeparator />
    </section>
  );
}

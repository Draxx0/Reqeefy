'use client';
import {
  Button,
  CreateProjectForm,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  PaginationComponent,
} from '@/components/client.index';
import { SMALL_PAGE_SIZE, SortOrderType, sortOrderValues } from '@/constants';
import { EmptyProjects } from '@/containers/empty-state';
import { GlobalError } from '@/containers/error-state';
import { useGetProjects } from '@/hooks';
import { Agency } from '@reqeefy/types';
import { ArrowDownUp, GitBranchPlus } from 'lucide-react';
import { parseAsInteger, parseAsStringLiteral, useQueryState } from 'nuqs';
import { Input, PageHeader } from '../../../components/server.index';
import { AgencySettingsProjectsList } from './AgencySettingsProjectsList';

export const AgencySettingsProjectsContent = ({
  agency,
}: {
  agency: Agency;
}) => {
  const [currentPage, setCurrentPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1)
  );

  const [sortOrder, setSortOrder] = useQueryState<SortOrderType>(
    'sort_order',
    parseAsStringLiteral(sortOrderValues).withDefault('DESC')
  );

  const [searchTerm, setSearchTerm] = useQueryState('search', {
    defaultValue: '',
    throttleMs: 1000,
  });

  const {
    data: projects,
    isLoading,
    isError,
  } = useGetProjects({
    agency,
    queryParams: {
      page: currentPage,
      limit_per_page: SMALL_PAGE_SIZE,
      search: searchTerm,
      sort_by: 'created_at',
      sort_order: sortOrder,
    },
  });

  //! Should be updated to a skeleton loader
  if (isLoading || !projects) return <div>Loading...</div>;

  if (isError && !projects) {
    return <GlobalError />;
  }

  const totalPages = Math.ceil(projects.pagination.total / SMALL_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-12">
      <PageHeader
        title={'Projets'}
        size="small"
        description="
          Gérez les projets de votre agence, ajoutez-en de nouveaux ou modifiez les informations existantes.
        "
        hasSeparator
      />

      <div className="flex justify-between items-center">
        <Input
          searchInput
          type="text"
          placeholder="Recherche..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-3">
                Ajouter un projet <GitBranchPlus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader className="mb-4">
                <DialogTitle className="text-2xl">
                  Créer un nouveau projet
                </DialogTitle>
                <DialogDescription className="text-gray-900">
                  Remplissez les informations nécessaires pour créer un nouveau
                  projet.
                </DialogDescription>
              </DialogHeader>
              <CreateProjectForm agency={agency} />
              {/* <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
          <Button
            variant={'ghost'}
            className="flex gap-2 items-center border border-gray-700"
            onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
          >
            <span>{sortOrder === 'ASC' ? 'Plus anciens' : 'Plus récents'}</span>
            <ArrowDownUp className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {projects.data && projects.data.length > 0 ? (
        <>
          <div className="grid grid-cols-3 gap-12">
            <AgencySettingsProjectsList projects={projects.data} />
          </div>

          {totalPages > 1 ? (
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : null}
        </>
      ) : (
        <div className="flex items-center justify-center">
          <EmptyProjects />
        </div>
      )}
    </div>
  );
};

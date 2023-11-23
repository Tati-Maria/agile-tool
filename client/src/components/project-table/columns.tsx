import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { ArrowUpDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ProjectActions } from '.';

export type Project = {
  id: string;
  name: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  progress: number; // TODO: BASED ON TASKS
  owner: string;
};

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          variant={'ghost'}
        >
          Name
          <ArrowUpDownIcon className="ml-2 w-4 h-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    cell: ({ row }) => {
      return <span>{row.original.isActive ? 'Yes' : 'No'}</span>;
    },
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ row }) => {
      return (
        <span>{format(new Date(row.original.startDate), 'LLL dd, y')}</span>
      );
    },
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ row }) => {
      return <span>{format(new Date(row.original.endDate), 'LLL dd, y')}</span>;
    },
  },
  {
    accessorKey: 'owner',
    header: 'Owner',
  },
  {
    accessorKey: 'progress',
    header: 'Progress',
    cell: ({ row }) => {
      return <span>{row.original.progress}%</span>;
    },
  },
  {
    accessorKey: 'actions',
    cell: ({row}) => <ProjectActions data={row.original.id} />
  },
];

export default columns;

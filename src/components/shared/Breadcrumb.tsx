import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface BreadCrumbProps {
    name: string;
    location?: string;
}

const BreadCrumb = ({ BreadCrumbs }: { BreadCrumbs: BreadCrumbProps[] }) => {
    return (
        <Breadcrumb className='py-3 px-1'>
            <BreadcrumbList className='text-slate-800'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {BreadCrumbs.map((breadcrumb, index) => {
                    return (
                        <div key={index} className='flex items-center gap-2.5'>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={breadcrumb.location ? breadcrumb.location : '#'}>
                                    {breadcrumb.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </div>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;

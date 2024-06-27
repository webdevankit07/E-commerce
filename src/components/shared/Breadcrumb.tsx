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
    lastElement?: boolean;
}

const BreadCrumb = ({ BreadCrumbs }: { BreadCrumbs: BreadCrumbProps[] }) => {
    return (
        <Breadcrumb className='py-3 px-1'>
            <BreadcrumbList className='text-slate-800'>
                <BreadcrumbItem>
                    <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                {BreadCrumbs.map((breadcrumb) => {
                    return (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href={breadcrumb.lastElement ? '#' : breadcrumb.location}>
                                    {breadcrumb.name}
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default BreadCrumb;

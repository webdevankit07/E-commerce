import BreadCrumb from '@/components/shared/Breadcrumb';

const Profile = () => {
    return (
        <div>
            <BreadCrumb BreadCrumbs={[{ name: 'My Account' }, { name: 'Profile' }]} />
        </div>
    );
};

export default Profile;

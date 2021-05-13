import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuthentication } from '../../hooks';
import { SingleSlug } from './SingleSlug';
import { TrackerInput } from './TrackerInput';
import { UserSlugs } from './UserSlugs';

export const Track = () => {
    const urlParams = useParams();
    const logged = useAuthentication();

    if (urlParams.slug) {
        return <SingleSlug />;
    }

    if (!logged) {
        return <TrackerInput />;
    }

    return (
        <>
            <TrackerInput />
            <UserSlugs />
        </>
    );
};

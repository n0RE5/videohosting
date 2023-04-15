import React, { useEffect, useState } from 'react';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import { getUserSubs } from '../backendAPI/subscribtionsAPI';
import { useFetching } from '../hooks/useFetching';
import { fetchedUser } from '../types/Interfaces';
import Loader from '../components/UI/Loader/Loader';
import SubsModule from '../modules/SubsModule';
import '../styles/subspage.scss'

function SubsPage() {
    const [userSubs, setUserSubs] = useState<fetchedUser[]>([])

    const [fetchSubscriptions, isFetching] = useFetching(async () => {
        const response = await getUserSubs()
        setUserSubs(response)
    })

    useEffect(() => {
       fetchSubscriptions()
    }, [])

    return (
        <DefaultContainer appTitle='Подписки - YouVI'>
            {isFetching
                ? <Loader />
                : <SubsModule userSubs={userSubs}/>
            }
        </DefaultContainer>
    );
};

export default SubsPage;
import { API_URL } from '../../../config';

/**
 * fetchInfo
 * core function which fetches profile information
 */
export const fetchInfo = async (history, compId, setCompetitionName, setApikey, setScores, setLoading) => {
    // initial info request asks for the admin route
    const adminInfoRequest = await fetch(API_URL + '/api/competitions/admininfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({ compId: compId })
    });
    const parsedAdminInfoRequest = await adminInfoRequest.json();
    if(parsedAdminInfoRequest.status === 'success'){
        const adminInfoData = parsedAdminInfoRequest.data;
        setCompetitionName(adminInfoData.name);
        setApikey(adminInfoData.apikey);
    }else{
        // admin info route failed, look at regular info route
        const infoRequest = await fetch(API_URL + '/api/competitions/info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({ compId: compId })
        });
        const parsedInfoRequest = await infoRequest.json();
        if(parsedInfoRequest.status === 'success'){
            const infoData = parsedInfoRequest.data;
            setCompetitionName(infoData.name);
        }else{
            history.push('/home');
        }
    }

    // get the scores and set the scores state
    const scoreRequest = await fetch(API_URL + '/api/competitions/getscores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({ compId: compId })
    });
    const parsedScoreRequest = await scoreRequest.json();
    if(parsedScoreRequest.status === 'success'){
        setScores(parsedScoreRequest.data);
        setLoading(false);
    }else{
        history.push('/home');
    }
}

/**
 * generateHandleAddUserSubmit
 * wrapper around handleAddUserSubmit to supply compId
 */
export const generateHandleAddUserSubmit = (toast, compId) => {
    /**
     * handleAddUserSubmit
     * core logic for handling adding a user to a competition
     */
    const handleAddUserSubmit = async (values, actions) => {
        const addUserRequest = await fetch(API_URL + '/api/competitions/adduser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('authToken')
            },
            body: JSON.stringify({compId: compId, username: values.username})
        });
        const parsedAddUserRequest = await addUserRequest.json();
        if(parsedAddUserRequest.status){
            if(parsedAddUserRequest.status === 'success'){
                toast({
                    position: 'top-right',
                    title: 'User added to competition',
                    description: 'The user was successfully added to the competition.',
                    status: 'success',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else if(parsedAddUserRequest.data === 'username does not exist'){
                toast({
                    position: 'top-right',
                    title: 'Username not found',
                    description: 'The requested username was not found, please try again.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else if(parsedAddUserRequest.data === 'the user is already a part of the competition'){
                toast({
                    position: 'top-right',
                    title: 'Username is already a participant',
                    description: 'The requested user is already a participant.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }else{
                toast({
                    position: 'top-right',
                    title: 'Something went wrong',
                    description: 'Something went wrong, please try again.',
                    status: 'error',
                    duration: '3000',
                    isClosable: true
                });
                actions.setSubmitting(false);
            }
        }else{
            toast({
                position: 'top-right',
                title: 'Something went wrong',
                description: 'Something went wrong, please try again.',
                status: 'error',
                duration: '3000',
                isClosable: true
            });
            actions.setSubmitting(false);
        }
    };

    return handleAddUserSubmit;
}
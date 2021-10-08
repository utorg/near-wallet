import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { refreshAccountExternal, getProfileStakingDetails } from '../redux/actions/account';
import { selectAccountId, selectAccountSlice } from '../redux/slices/account';
import { selectAllAccountsSlice } from '../redux/slices/allAccounts';

export function useAccount(accountId) {
    const ownerAccountId = useSelector((state) => selectAccountId(state));
    const account = useSelector((state) => selectAccountSlice(state));
    const allAccounts = useSelector((state) => selectAllAccountsSlice(state));

    const isOwner = ownerAccountId === accountId;

    const dispatch = useDispatch();
    useEffect(() => {
        if (!isOwner) {
            (async () => {
                await dispatch(refreshAccountExternal(accountId));
                dispatch(getProfileStakingDetails(accountId));
            })();
        }
    }, [accountId]);

    return isOwner
        ? account
        : allAccounts[accountId] || {};
}

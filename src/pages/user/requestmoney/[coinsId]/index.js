import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React from 'react';

const RequestMoney = () => {
    // const params = useParams();
    // const coinsId = params?.coinsId;
    const router = useRouter();
    const { coinsId } = router.query;
    console.log("🚀 ~ RequestMoney ~ coinsId:", coinsId)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ height: 200, textAlign: 'center', lineHeight: '200px' }}>
                    Column 1 Content
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Paper elevation={3} style={{ height: 200, textAlign: 'center', lineHeight: '200px' }}>
                    Column 2 Content
                </Paper>
            </Grid>
        </Grid>
    );
};

export default RequestMoney;
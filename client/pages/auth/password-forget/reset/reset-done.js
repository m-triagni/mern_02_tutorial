import Layout from '../../../../components/Layout';

const ResetDone = () => {
    const resetDone = () => {
        return (
            <React.Fragment>
                <h1>Reset Done</h1>
                <br />
                <p>Please login with new password</p>
            </React.Fragment>
        ) 
    }
    return (
        <Layout>
            
            <div className="col-md-6 offset-md-3">
                {resetDone()} 
            </div> 
        </Layout>
    )
}

export default ResetDone;
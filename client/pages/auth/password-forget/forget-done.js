import Layout from '../../../components/Layout';

const ForgetDone = () => {
    const forgetDone = () => {
        return (
            <React.Fragment>
                <p>Please check your email to reset your password</p>
            </React.Fragment>
        ) 
    }
    return (
        <Layout>
            
            <div className="col-md-6 offset-md-3">
                {forgetDone()} 
            </div> 
        </Layout>
    )
}

export default ForgetDone;
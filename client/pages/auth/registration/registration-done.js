import Layout from '../../../components/Layout';

const RegistrationDone = () => {
    const registrationDone = () => {
        return (
            <React.Fragment>
                <h1>Registration Done</h1>
                <br />
                <p>Please check your email to activate your email</p>
            </React.Fragment>
        ) 
    }
    return (
        <Layout> 
            <section id="app-form" class="app-form section-bg">
                <div class="container"> 
                    <div class="row justify-content-center">
                        <div class="col-lg-4 mt-4 mt-lg-0">
                            {registrationDone()} 
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default RegistrationDone;
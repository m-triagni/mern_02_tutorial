import axios from 'axios';

import {API} from '../../config'
import { getCookie } from '../../utils/auth';
import { listEnum } from '../../listEnum';
import { listAPI } from '../../listAPI';

const withUser = Page => {
    const withAuthUser = props => <Page {...props} />
    
    withAuthUser.getInitialProps = async context => {
 
        const token = getCookie(listEnum.browserStorageKey.token, context.req);
 
        let user = null;
        if(token) {
            try {
                const response = await axios.get(`${API}${listAPI.API_User}`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        contentType: 'application/json'
                    }
                })
                user = response.data.user
            }catch(error) {
                if(error.response.status === 401) {
                    user = null;
                }
            }
        }

        if(user === null) {
            context.res.writeHead(302, {
                Location: '/'
            })
            context.res.end();
        }
        else {
            return {
                ...(Page.getInitialProps ? await Page.getInitialProps(context) : {}), user, token
            };
        }
    };

    return withAuthUser;
}

export default withUser;

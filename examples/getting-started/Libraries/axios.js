const axios=require('axios');
const {expect}=require('chai');

// Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
// See below for an example using Custom instance defaults instead.

const accessToken = '';
const apiUrl ='https://jsonplaceholder.typicode.com/';

const authAxios = axios.create({

    baseURL:apiUrl,
    headers:{
        
        'Conctent-Type':'application/json'
    }
})

describe("Customer API Testing", async () => {
    
    it("Get Users", async () => {
        const response = await authAxios.get(`${apiUrl}users/`, { //calling the get API
            
        });

        console.log(response.data);
        expect(response.status).equals(200); //asserting if the response code is 200
    })
    it("User Login", async () => {
        const response = await authAxios.post(`${apiUrl}users/`,
            {
                "name": "morpheus",
                "job": "leader"
            }
        ).then(res => res.data)
        console.log(response);
        expect(response.name).equals("morpheus")
        expect(response.job).equals("leader")

    })
    it("Post Posts", async () => {
        const response = await authAxios.post(`${apiUrl}posts`,
            {
                body: JSON.stringify({
                    title: 'QA Archtect',
                    body: 'Hakan Tektaş',
                    userId: 1,
                  }),
            }
        ).then(res => res.data)
        console.log(response);

    })
})
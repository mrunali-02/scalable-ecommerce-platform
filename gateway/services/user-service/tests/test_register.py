def test_register_user(

    client

):

    response = client.post(

        "/users/register",

        json={

            "full_name":"John",

            "email":"john@test.com",

            "password":"password123",

            "phone":"1234567890"

        }

    )

    assert response.status_code == 201

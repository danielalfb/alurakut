import React, { useState, useEffect } from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

const githubAPI = 'https://api.github.com/users/danielalfb/followers';

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />

      <p>
        <a
          className="boxLink"
          href={`https://github.com/${props.githubUser}.png`}
        >
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} <span className="boxLink">({props.items.length})</span>
      </h2>
      <ul>
        {props.items
          .map((crr) => {
            const { id, login, html_url } = crr;
            return (
              <li key={id}>
                <a href={html_url}>
                  <img src={`https://github.com/${login}.png`} />
                  <span>{login}</span>
                </a>
              </li>
            );
          })
          .slice(1, 7)}
      </ul>
      <a className="boxLink" href="/">
        Ver todos
      </a>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const [followers, setFollowers] = React.useState([]);
  React.useEffect(() => {
    fetch(githubAPI).then(async (res) => {
      const data = await res.json();
      setFollowers(data);
    });

    //GraphQL
    fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: '7e2001b357adce3ae4e96be1742b99',
      },
      body: JSON.stringify({
        query: `query {
          allCommunities {
            id
            title
            image
            creatorslug
         }
        }`,
      }),
    })
      .then((res) => res.json())
      .then((resFull) => {
        const datoCommunities = resFull.data.allCommunities;
        setCommunities(datoCommunities);
      });
  }, []);

  const user = props.githubUser;
  const [communities, setCommunities] = React.useState([]);

  return (
    <>
      <AlurakutMenu githubUser={user} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o), {user}</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form
              onSubmit={function handlecommunitiesSubmit(e) {
                e.preventDefault();
                const formsData = new FormData(e.target);
                const community = {
                  title: formsData.get('title'),
                  image: formsData.get('image'),
                  creatorslug: user,
                };

                fetch('/api/communities', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(community),
                }).then(async (res) => {
                  const data = await res.json();
                  const community = data.createdData;
                  const updatedCommunities = [...communities, community];
                  setCommunities(updatedCommunities);
                });
              }}
            >
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa."
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa."
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileConnectArea"
          style={{ gridArea: 'profileConnectArea' }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades&#160;
              <span className="boxLink">({communities.length})</span>
            </h2>

            <ul>
              {communities.map((result) => {
                const { id, title, image } = result;
                return (
                  <li>
                    <a href={`/communities/${id}`}>
                      <img src={image} />
                      <span>{title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    'https://alurakut.vercel.app/api/auth',
    {
      headers: {
        Authorization: token,
      },
    },
  ).then((res) => res.json());

  if (!isAuthenticated) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser,
    },
  };
}

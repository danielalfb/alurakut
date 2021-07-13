import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from '../src/lib/AlurakutCommons';

function ProfileSidebar(props) {
  return (
    <Box>
      <img
        src={`https://github.com/${props.githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
    </Box>
  );
}

export default function Home() {
  const user = 'danielalfb';
  const conexoes = [
    'LidianeMara',
    'marcobrunodev',
    'inglyd',
    'thatzfer',
    'juunegreiros',
    'peas',
  ];
  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vinda(o), {user}</h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div
          className="profileConnectArea"
          style={{ gridArea: 'profileConnectArea' }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas conexões{' '}
              <span className="boxLink">({conexoes.length})</span>
            </h2>
            <ul>
              {conexoes.map((crr) => {
                return (
                  <li>
                    <a href={`/user/${crr}`} key={crr}>
                      <img src={`https://github.com/${crr}.png`} />
                      <span>{crr}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas comunidades</h2>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

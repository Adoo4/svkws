import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Divider,
} from '@mui/material';
import {
  AutoStories,
  ArrowForward,
} from '@mui/icons-material';

import { useNavigate } from "react-router-dom";




export function RamadanPromotion() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: '100%',
        py: { xs: 10, md: 14 },
        position: 'relative',
         background: "linear-gradient(360deg,#313131 0%, rgba(38, 38, 38, 1) 50%, rgb(0, 0, 0) 100%)",
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 6, md: 8 }}
          alignItems="center"
          sx={{
            maxWidth: '1500px',
            mx: 'auto',
          }}
        >
          {/* Book Image */}
          <Box
            sx={{
              flex: { xs: '0 0 auto', md: '0 0 40%' },
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                maxWidth: { xs: '260px', sm: '320px', md: '380px' },
                width: '100%',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -30,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90%',
                  height: '60px',
                  background: 'radial-gradient(ellipse, rgba(184, 134, 11, 0.2), transparent)',
                  filter: 'blur(25px)',
                  zIndex: -1,
                },
              }}
            >
              <img src="./Kur'an časni.png"
                alt="Kur'an Časni s prijevodom na bosanski jezik"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5))',
                }}
              />
            </Box>
          </Box>

          {/* Content */}
          <Box sx={{ flex: 1 }}>
            {/* Ramadan Notice */}
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(184, 134, 11, 0.7)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                mb: {xs:0, md:2},
                display: 'block',
              }}
            >
              Sa ponosom predstavljamo
            </Typography>

            {/* Title */}
            <Typography
              variant="h2"
              sx={{
                color: '#fff',
                mb: 1.5,
                fontSize: { xs: '1.55rem', md: '2rem' },
                fontWeight: 400,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
              }}
            >
              Kur'an Časni, drugo izdanje
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255, 255, 255, 0.7)',
                mb: {xs:2, md:4},
                fontSize: { xs: '0.9rem', md: '1.10rem' },
                fontWeight: 300,
              }}
            >
              s prijevodom na bosanski jezik
            </Typography>

            <Divider
              sx={{
                borderColor: 'rgba(184, 134, 11, 0.2)',
                mb: {xs:2, md:4},
                width: '60px',
              }}
            />

            {/* Author Section - Redesigned */}
            <Box sx={{ mb: {xs:2, md:4} }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'rgba(184, 134, 11, 0.6)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 0.5,
                }}
              >
                Prijevod s arapskog jezika
              </Typography>
              <Box>
              <Typography
                variant="h4"
                sx={{
                  color: '#B8860B',
                  fontWeight: 300,
                  fontSize: { xs: '1.0rem', md: '1.75rem' },
                  mb: 1,
                }}
              >
                Prof. dr. Esad Duraković
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.9rem',
                  fontStyle: 'italic',
                }}
              >
                akademik, orijentalista
              </Typography>
              </Box>
            </Box>


            {/* Description */}
            <Typography
              variant="body1"
              sx={{
                color: '#fafafa',
                mb: 3,
                lineHeight: 1.9,
                fontSize: { xs: '0.75em', md: '1rem' },
                fontWeight: 300,
              }}
            >
              Novo izdanje predstavlja kulminaciju dvadesetogodišnjeg predanog rada 
              jednog od najznačajnijih bosanskohercegovačkih orijentologa. Kroz pažljivo 
              stilističko oblikovanje, ovaj prijevod donosi novu dimenziju razumijevanja 
              kur'anskog teksta, gdje tradicija susreće suvremeno promišljanje.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#fafafa',
                mb: 4,
                lineHeight: 1.9,
                fontSize: { xs: '0.75em', md: '1rem' },
                fontWeight: 300,
              }}
            >
              Ovo nije samo prijevod, već svjedočanstvo jednog života posvećenog 
              proučavanju i tumačenju Kur'ana, trajni doprinos bosanskoj kulturnoj i 
              duhovnoj baštini.
            </Typography>

            {/* Key Features */}
            <Box
              sx={{
                borderLeft: '2px solid rgba(184, 134, 11, 0.3)',
                pl: 3,
                mb: 5,
                py: 0.5,
              }}
            >
              <Stack spacing={1.5}>
                <Typography
                  variant="body2"
                  sx={{
                   color: '#fafafa',
                    fontSize: { xs: '0.75em', md: '0.9rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#B8860B',
                      display: 'inline-block',
                    }}
                  />
                  Doprinos lingvistike, tefsira i stilistike
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                   color: '#fafafa',
                    fontSize: { xs: '0.75em', md: '0.9rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#B8860B',
                      display: 'inline-block',
                    }}
                  />
                  Približavanje ritmu i rimi izvornog teksta
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#fafafa',
                    fontSize: { xs: '0.75em', md: '0.9rem' },
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      bgcolor: '#B8860B',
                      display: 'inline-block',
                    }}
                  />
                  Drugo, dorađeno izdanje
                </Typography>
              </Stack>
            </Box>

            {/* CTA */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                onClick={()=> navigate("/books/kur-an-sa-prijevodom")}
                sx={{
                  borderColor: 'rgba(184, 134, 11, 0.4)',
                  color: '#B8860B',
                  px: 4,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  '&:hover': {
                    borderColor: '#B8860B',
                    bgcolor: 'rgba(184, 134, 11, 0.05)',
                  },
                }}
              >
                Naruči izdanje
              </Button>
              <Button
                variant="text"
                size="large"
                startIcon={<AutoStories />}
               onClick={() => window.open("https://cns.ba/tekst-je-uvijek-isti-ali-mi-se-mijenjamo/", "_blank")}
                sx={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  px: 4,
                  py: 1.5,
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  textTransform: 'none',
                  letterSpacing: '0.02em',
                  '&:hover': {
                    color: 'rgba(255, 255, 255, 0.9)',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                  },
                }}
              >
                Više o prijevodu
              </Button>
            </Stack>

          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
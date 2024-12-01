import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import Navbar from "../components/navbar";
import Link from "next/link";
import Head from "next/head";

import InstagramIcon from "@mui/icons-material/Instagram";
import Linkedin from "@mui/icons-material/LinkedIn";
import ReleaseCard from "../components/releaseCard";
import Iterative from "../components/iterativeText";
import Modal from "../components/modal";

import supabase from "@/utils/supabaseClient";

type Release = {
  name: string;
  img: string;
  logline: string | null;
  description: string | null;
  credits: string[] | null;
  url: string | null;
  embedplayer: string | null;
  released: boolean | null;
  descimgs: string[] | null;
  artcreds: string[] | null;
  featured: boolean;
};



export default function Home() {
  const [windowWidth, setWindowWidth] = React.useState(901);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalRelease, setModalRelease] = React.useState<Release | null>(null);
  const [featuredReleases, setFeaturedReleases] = React.useState<Release[]>([]);

  
  React.useEffect(() => {
    setWindowWidth(window.innerWidth);

    const fetchReleases = async () => {
      const { data, error } = await supabase
        .from('releases')
        .select('*')
        .eq('featured', true);

      if (error) {
        console.error("Error fetching releases:", error);
      } else {
        setFeaturedReleases(data || []);
      }
    };

    fetchReleases();
}, []);

  return (
    <>
      <Head>
        <title>Fable Mason Studios</title>
        <link rel="shortcut icon" type="image/png" href="Fable Mason Logo Compressed.png"/>
      </Head>
      <Navbar />
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} modalRelease={modalRelease} windowWidth={windowWidth} />
      <Box
        sx={{
          height: "95vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          // backgroundImage: `linear-gradient(0deg, #8c6234 0%, #2f4050 100%)`,
          // backgroundColor: '#2f4050'
          backgroundColor: '#000000'
        }}
      >
        <Container
          sx={{
            marginTop: 15,
            // display: "flex",
            // alignItems: "center",
            // flexDirection: "column",
          }}
        >
          <Typography
            variant={windowWidth > 800 ? "h1" : "h2"}
            fontFamily="Courier"
            fontWeight={100}
            textAlign="center"
            color="#ffffff"
          >
            <Iterative text="Fable Mason Studios" />
          </Typography>
          <Typography
            variant={windowWidth > 800 ? "h3" : "h5"}
            fontFamily="Merriweather"
            textAlign="center"
            fontWeight={100}
            marginTop={3}
            color="#aaaaaa"
          >
            A student-run multimedia startup based out of Northwestern
            University
          </Typography>
        </Container>
        <Container>
          <Container sx={{ display: "flex", justifyContent: "center" }}>
            <Link href="#featured" scroll={false}>
              <Box
                sx={{
                  background: "#ff9a03",
                  color: "white",
                  paddingX: 4,
                  paddingY: 1,
                  borderRadius: 4,
                }}
              >
                <Typography fontSize={24} fontFamily="Merriweather">
                  Our Work
                </Typography>
              </Box>
            </Link>
          </Container>
          <Container
            sx={{ display: "flex", justifyContent: "center", marginTop: 1}}
          >
            <Link href="https://www.instagram.com/fablemasonstudios/" target="_blank">
              <InstagramIcon fontSize="large" style={{color: 'white', margin: 3}}></InstagramIcon>
            </Link>
            <Link href="https://www.linkedin.com/company/fable-mason-studios/posts/?feedView=all" target="_blank">
              <Linkedin fontSize="large" style={{color: "white", margin: 3}}></Linkedin>
            </Link>
          </Container>
        </Container>
      </Box>
      <Box
        id="featured"
        sx={{
          margin: 0,
          padding: "5%",
          minHeight: "100vh",
          background: "#fdbb2d",
          // backgroundImage: `linear-gradient(0deg, #2f4050 0%,  100%)`,
        }}
      >
        <Container sx={{ color: "white" }}>
          <Typography variant="h2" fontFamily="Merriweather" textAlign="center">
            Featured
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              marginY: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid container spacing={6}>
              {featuredReleases.map((r, i) => {
                return (
                  <ReleaseCard
                    xs={12}
                    sm={6}
                    md={4}
                    img={r.img}
                    key={i}
                    released={
                      r.released === undefined
                        ? false
                        : (!r.released as boolean)
                    }
                    onClick={() => {
                      setModalRelease(r);
                      setModalOpen(true);
                    }}
                  >
                    {!(r.released === undefined || r.released) && (
                      <Typography color="red" fontWeight={800}>
                        Coming Soon!
                      </Typography>
                    )}
                    <Typography
                      fontWeight={400}
                      textAlign="center"
                      fontFamily="Merriweather"
                      fontSize={24}
                    >
                      {r.name}
                    </Typography>
                    <Typography
                      fontWeight={100}
                      fontFamily="Merriweather"
                      fontSize={12}
                      textAlign="center"
                      marginY={1}
                    >
                      {r.logline}
                    </Typography>
                  </ReleaseCard>
                );
              })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}

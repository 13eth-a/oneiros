import * as React from "react";
import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Button,
  Grid,
} from "@mui/material";

import Navbar from "../components/navbar";
import AboutCard from "../components/aboutCard";

import supabase from "@/utils/supabaseClient";

type Profile = {
  name: string;
  role: string | null;
  img: string;
  description: string | null;
  alum: boolean;
}

export default function Team() {
  const [profile, setProfile] = React.useState<Profile[]>([]);
  
  React.useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let { data, error } = await supabase
          .from('profiles')
          .select('*')

        if (error) throw error;
        setProfile(data || []);
      } catch (error) {
        console.error('Error obtaining profile data:', error);
      }
    };

    fetchProfiles();
  }, []);


  return (
    <>
      <Navbar />
      <Box
        id="about"
        sx={{
          margin: 0,
          padding: "5%",
          minHeight: "100vh",
          // background: "#048fd4",
          background: `linear-gradient(0deg, rgba(1,39,75,1) 0%, rgba(47,64,80,1) 100%);`,
        }}
      >
        <Container sx={{ color: "white" }}>
          <Typography variant="h2" fontFamily="Merriweather" textAlign="center">
            Our Team
          </Typography>
          <Box sx={{ flexGrow: 1, marginY: 5 }}>
            <Grid container spacing={6}>
              {profile
                .filter((p) => !p.alum)
                .map((p, i) => {
                  return (
                    <AboutCard xs={12} sm={6} md={4} img={p.img} key={i}>
                      <Typography
                        fontWeight={100}
                        textAlign="center"
                        fontFamily="Merriweather"
                        fontSize={18}
                      >
                        {p.name}
                      </Typography>
                      <Typography
                        fontWeight={800}
                        fontFamily="Merriweather"
                        fontSize={14}
                        textAlign="center"
                        sx={{ marginY: "1em" }}
                      >
                        {p.role}
                      </Typography>
                      <Typography
                        fontWeight={100}
                        fontFamily="Merriweather"
                        fontSize={14}
                        textAlign="center"
                      >
                        {p.description}
                      </Typography>
                    </AboutCard>
                  );
                })}
            </Grid>
          </Box>
        </Container>
        <Container sx={{ color: "white" }}>
          <Typography variant="h2" fontFamily="Merriweather" textAlign="center">
            Alumni
          </Typography>
          <Box sx={{ flexGrow: 1, marginY: 5 }}>
            <Grid container spacing={6}>
              {profile
                .filter((p) => p.alum)
                .map((p, i) => {
                  return (
                    <AboutCard xs={12} sm={6} md={4} img={p.img} key={i}>
                      <Typography
                        fontWeight={100}
                        textAlign="center"
                        fontFamily="Merriweather"
                        fontSize={18}
                      >
                        {p.name}
                      </Typography>
                    </AboutCard>
                  );
                })}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
}
import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";

import Navbar from "../components/navbar";
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


export default function Releases() {
  const [windowWidth, setWindowWidth] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalRelease, setModalRelease] = React.useState<Release | null>(null);
  const [releases, setReleases] = React.useState<Release[]>([]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setWindowWidth(window.innerWidth);

    const fetchReleases = async () => {
      const { data, error } = await supabase
        .from('releases')
        .select('*')
        .eq('featured', true);

      if (error) {
        console.error("Error fetching releases:", error);
      } else {
        setReleases(data || []);
      }
    };

    fetchReleases();
  }, []);

  return (
    <>
      <Navbar />
      <Modal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalRelease={modalRelease}
        windowWidth={windowWidth}
      />
      <Container sx={{ marginTop: 10 }}>
        <Typography
          variant="h2"
          fontFamily="Merriweather"
          textAlign="center"
          marginBottom={4}
        >
          Inquiries
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color="black"
            fontFamily="Merriweather"
            sx={{ textAlign: "center" }}
          >
            For general inquiries, please email us at{" "}
            <Link
              style={{ textDecoration: "underline" }}
              href="mailto:fablemasonstudios@gmail.com"
            >
              fablemasonstudios@gmail.com
            </Link>
          </Typography>
        </Container>
      </Container>
      <Container sx={{ marginTop: 10 }}>
        <Typography
          variant="h2"
          fontFamily="Merriweather"
          textAlign="center"
          marginBottom={4}
        >
          Advertising Grant
        </Typography>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            color="black"
            fontFamily="Merriweather"
            sx={{ textAlign: "center" }}
          >
            Please fill out{" "}
            <Link
              style={{ textDecoration: "underline" }}
              href="mailto:fablemasonstudios@gmail.com"
            >
              this
            </Link>
            {" "} form if you&apos;re interested in our advertising grant!
          </Typography>
        </Container>
      </Container>
    </>
  );
}

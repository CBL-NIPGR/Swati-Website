import React from "react";
import logo from "../../Images/logo-black.png";
import namaste from "../../Images/namaste.png";
import about from "../../Images/about.jpg";
import Homepage from "../../Images/homepage.jpg";
import "./styles.css";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  LinearProgress,
} from "@material-ui/core";

const Home = (props) => {
  console.log(props);
  const [data, setData] = React.useState([]);
  const [keys, setKeys] = React.useState([]);

  const fetchData = () => {
    fetch(
      "https://docs.google.com/spreadsheets/d/1jVeewIxtQZAhzibGCnt7IG4ylCMuke78KwWZRb_k9Mo/gviz/tq?&sheet=Sheet1&tq=select *"
    )
      .then((res) => res.text())
      .then((rep) => {
        //Remove additional text and extract only JSON:
        const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
        console.log(jsonData);
        const cols = jsonData?.table?.cols?.map((col) => col.label);
        const rows = jsonData?.table?.rows?.map((row) => {
          const obj = {};
          row?.c?.forEach((cell, index) => {
            if (cell) {
              obj[cols[index]] = cell?.v;
            }
          });
          return obj;
        });
        setData(rows);
        setKeys(cols);
      });
  };
  console.log({ data });

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <header>
        <img src={logo} class="img-logo" alt="Logo" />
        <a href="index.html" class="head">
          DBT-SWATI
        </a>
        <nav class="nav">
          <ul>
            <li>
              <a class="active" href="">
                Home
              </a>
            </li>
            <li>
              <a href="">About DBT-SWATI</a>
            </li>
            <li>
              <a href="">WiS Pioneers</a>
            </li>
            <li>
              <a href="">WiS Faculty</a>
            </li>
            <li>
              <a href="">WiS PostDocs</a>
            </li>
            <li>
              <a href="">WiS Students</a>
            </li>
          </ul>
        </nav>
        <div class="search-bar">
          <input
            class="search-bar"
            type="text"
            name="search"
            id="searchbox"
            placeholder=" Type for Search"
          ></input>
        </div>
        <button class="search-btn" onClick={fetchData}>
          Search
        </button>
      </header>
      <section>
        <img src={Homepage} class="img-background" alt="Homepage" />
        <div id="aboutusid" class="aboutussection">
          <div class="aboutusmidsection">
            <div class="aboutusheading">ABOUT SWATI</div>
            <div class="clr-bar">
              <img src={namaste} class="namaste" alt="Namaste" />
            </div>
            <div class="aucardcontainer">
              <div class="aucard">
                <h3>An Initiative of the DBT</h3>
                <div class="content">
                  In recognition of the wide ranging contributions by Women in
                  Science, Secretary DBT announced an online portal dedicated to
                  all Women Scientists funded by Department of Biotechnology.
                  The portal will be called "SWATI" Portal (Science for Women: A
                  Technology and Innovation Portal).
                  <br />
                  The SWATI portal is intended to serve as a Gateway to view the
                  Expertise and Contributions of Indian Women in Science,
                  specially to mark the 75th year of Indian Independence, in
                  celebration of Azadi Ka Amrit Mahotsav.
                </div>
              </div>
              <div class="aucard">
                <h3 class="title">
                  INAUGURATION OF THE PORTAL IN 2022 BY Dr. RENU SWARUP
                </h3>
                <div class="secontent">
                  <img src={about} class="secyimg img-fluid" alt="About" />
                </div>
                At the time of SWATI portal launch, Dr. Renu Swarup was the
                Secretary, Department of Biotechnology (DBT), Ministry of
                Science and Technology. She has actively contributed in the
                formulation of India’s Biotechnology Vision and Strategy and is
                also credited with establishment of India’s largest microbial
                resource centre, Microbial Culture Collection. She also holds
                the position of Chairperson, Biotechnology Industry Research
                Assistance Council (BIRAC), a Public Sector Company. A Ph.D. in
                Genetics and Plant Breeding, Dr. Renu Swarup completed her Post
                Doctoral at The John Innes Centre, Norwich UK, under
                Commonwealth Scholarship and returned to India to take up the
                assignment of a Science Manager in the Department of
                Biotechnology, Ministry of Science and Technology, in 1989. A
                Member of the National Academy of Sciences India (NASI), she is
                also a Member of Governing Body of National Institutes,
                Universities and Centers. She was awarded the “Bio-Spectrum
                Person of the Year Award” in 2012.
              </div>
              <div class="aucard">
                <h3 class="title">Data Collection for SWATI</h3>
                <div class="content">
                  In order to accurately create this portal on behalf of the
                  DBT, the NIPGR HRD Cell has collated first hand information
                  from Indian women researchers who have been funded by the DBT,
                  including PIs, post docs and students.
                </div>
              </div>
              <div class="aucard">
                <h3 class="title">JOINING SWATI</h3>
                <div class="content">
                  In case you would like to join the portal, please provide your
                  data by clicking{" "}
                  <a
                    href="https://forms.gle/MdWytd9kSa75UGPq9"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Here
                  </a>
                  .
                  <br />
                  The form can be filled in a few minutes, and will help us get
                  accurate information.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cardSection">
        <Typography variant="h4" component="h4">
          Data
        </Typography>
        <Grid container xs={12} spacing={3}>
          {data?.length > 0 ? (
            data?.map((row, index) => (
              <Grid
                item
                onClick={() =>
                  props?.setScreen({
                    screenType: "details",
                    data: { keys, row },
                  })
                }
              >
                <Card>
                  <div style={{ display: "flex" }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={row.image}
                      alt="green iguana"
                    />
                    <div>
                      <Typography variant="h6">{row?.["Full Name"]}</Typography>
                      <Typography variant="body2">
                        {row?.["Current Position"]}
                      </Typography>
                    </div>
                  </div>
                  <CardContent>
                    <Typography variant="h6">{row?.["Full Name"]}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <LinearProgress />
          )}
        </Grid>
      </section>
    </div>
  );
};

export default Home;

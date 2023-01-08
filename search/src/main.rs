use clap::Parser;
use std::{fmt, fs};

fn main() {
    let arguments = Arguments::parse();

    let cameras = load_data();
    let search_results: Vec<&Camera> = cameras
        .iter()
        .filter(|camera| camera.name.contains(&arguments.name))
        .collect();

    println!(
        "Found {} cameras when searching for \"{}\" ",
        search_results.len(),
        arguments.name
    );
    for camera in search_results {
        println!("{}", camera)
    }
}

#[derive(Parser, Debug)]
struct Arguments {
    #[arg(short, long)]
    name: String,
}

struct Camera {
    name: String,
    latitude: f64,
    longitude: f64,
}

impl fmt::Display for Camera {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        // extracting the camera code from the full name.
        // might be nicer to use a regex to filter out the numbers
        let name_sections: Vec<&str> = self.name.split("-").collect();
        let camera_code: Vec<&str> = name_sections[2].split(" ").collect();

        write!(
            f,
            "{} | {} | {} | {}",
            camera_code[0], self.name, self.latitude, self.longitude
        )
    }
}

fn parse_line(line: &str) -> Option<Camera> {
    let sections: Vec<&str> = line.split(";").collect();
    // Some protection against bad data
    if sections.len() != 3 {
        return None;
    }

    let latitude = sections[1].parse();
    let longitude = sections[2].parse();

    if latitude.is_ok() && longitude.is_ok() {
        Some(Camera {
            name: sections[0].to_string(),
            latitude: latitude.unwrap(),
            longitude: longitude.unwrap(),
        })
    } else {
        None
    }
}

fn load_data() -> Vec<Camera> {
    let raw = fs::read_to_string("./src/data.txt").expect("ERROR: could not open data file");
    raw.lines().filter_map(|line| parse_line(line)).collect()
}

package com.github.mjvesa.codesound.back;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.*;

@RestController
public class SongController {

	@CrossOrigin
	@GetMapping("/songs")
	public List<Song> songs(@RequestParam(value = "id", defaultValue = "0") Long id) {
		return List.of(
				new Song(0, "Sinful sounds 1", "Math.sin(t)"),
				new Song(1, "Sinful sounds 2", "Math.sin(t)"),
				new Song(2, "Sinful sounds 3", "Math.sin(t)"),
				new Song(3, "Sinful sounds 4", "Math.sin(t)"),
				new Song(4, "Sinful sounds 5", "Math.sin(t)"),
				new Song(5, "Sinful sounds 6", "Math.sin(t)"));
	}

	@CrossOrigin
	@PostMapping("/song")
	public List<Song> songs(@RequestParam(value = "song") Song song) {

		System.out.println("Got song " + song.getName());
	}

}

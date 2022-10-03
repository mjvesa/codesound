package com.github.mjvesa.codesound.back;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class SongController {


	@Autowired
	SongService songService;

	@CrossOrigin
	@GetMapping("/songs")
	public List<Song> getSongs(@RequestParam(value = "id", defaultValue = "0") Long id) {
		return songService.findAll();
	}

	@CrossOrigin
	@PostMapping("/songs")
	public Song saveSong(@RequestBody Song song) {
		return songService.save(song);ergw
	}

}

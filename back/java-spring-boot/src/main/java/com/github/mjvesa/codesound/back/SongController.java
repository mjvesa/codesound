package com.github.mjvesa.codesound.back;

import java.util.List;

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
		return songService.save(song);
	}

	@CrossOrigin
	@DeleteMapping("/songs")
	public void deleteSong(@RequestBody Song song) {
		songService.delete(song);
	}

}

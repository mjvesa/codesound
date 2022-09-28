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
	public List<Song> songs(@RequestParam(value = "id", defaultValue = "0") Long id) {
		return songService.findAll();
	}

//	@CrossOrigin
//	@PostMapping("/song")
//	public List<Song> songs(@RequestParam(value = "song") Song song) {
//
//		System.out.println("Got song " + song.getName());
//	}

}

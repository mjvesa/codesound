package com.github.mjvesa.codesound.back;

import java.util.concurrent.atomic.AtomicLong;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SongController {

	@GetMapping("/song")
	public Song song(@RequestParam(value = "id", defaultValue = "0") Long id) {
		return new Song(0, "Math.sin(t)");
	}
}

package com.github.mjvesa.codesound.back;

public class Song {

	private final long id;
	private final String name;
	private final String code;


	public Song(long id, String name, String code) {
		this.id = id;
		this.name=name;
		this.code = code;
	}

	public long getId() {
		return id;
	}

	public String getCode() {
		return code;
	}

	public String getName() {
		return name;
	}
}


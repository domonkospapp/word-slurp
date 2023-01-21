package com.dpapp.wordlearning.words

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WordRepository extends JpaRepository<Word, Long> {
}
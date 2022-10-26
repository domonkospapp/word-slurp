package com.dpapp.wordlearning

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface WordRepository extends JpaRepository<Word, Long> {
    boolean existsByOriginalAndForeign(String original, String foreign)

    List<WordProjection> findAllByUser(User user)
}
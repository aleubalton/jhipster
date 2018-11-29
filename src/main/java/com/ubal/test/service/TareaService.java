package com.ubal.test.service;

import com.ubal.test.service.dto.TareaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Tarea.
 */
public interface TareaService {

    /**
     * Save a tarea.
     *
     * @param tareaDTO the entity to save
     * @return the persisted entity
     */
    TareaDTO save(TareaDTO tareaDTO);

    /**
     * Get all the tareas.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<TareaDTO> findAll(Pageable pageable);

    /**
     * Get the "id" tarea.
     *
     * @param id the id of the entity
     * @return the entity
     */
    TareaDTO findOne(Long id);

    /**
     * Delete the "id" tarea.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}

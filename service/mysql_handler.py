import json
import mysql.connector
from mysql.connector import pooling

class Db:
    def __init__(self, config):
        try:
            self.connection_pool = pooling.MySQLConnectionPool(pool_name="pynative_pool",
                                                  pool_size=1,
                                                  pool_reset_session=True,
                                                  host=config["host"],
                                                  database=config["database"],
                                                  user=config["user"],
                                                  password=config["password"])
        except:
            print("error: No database pool created!")

    def get_location_details(self, id):
        retlist = {}
        res =  self.exec("SELECT `place_id`, `name`, `building`, `street_parish`, `primary_place_name`, `province`, `country`, `empire`, `synonyms`, `lat`, `lon`, `related_resource_id`, `emlo_url` FROM `location` WHERE place_id = " + str(id))
        if len(res) > 0:
            res[0]["synonyms"] = res[0]["synonyms"].replace("\n", ", ")
            res[0]["related_resources"] = self.get_resources_from_list(res[0]["related_resource_id"])
            #res[0]["nr_from"] = self.count_letters("origin_name", res[0]["name"])
            retlist["status"] = "OK"
            retlist["detail"] = res[0]
        else:
            retlist["status"] = "NOT_OK"
        return retlist

    def get_person_details(self, id):
        retlist = {}
        res = self.exec("SELECT `person_id`, `primary_name`, `synonyms`, `roles_titles`, `gender`, `is_organisation`, `birth_year`, `death_year`, `related_resource_id`, `emlo_url` FROM `person` WHERE person_id =" + str(id))
        if len(res) > 0:
            if res[0]["synonyms"]:
                res[0]["synonyms"] = res[0]["synonyms"].replace("\n", ", ")
            if res[0]["roles_titles"]:
                res[0]["roles_titles"] = res[0]["roles_titles"].replace("\n", ", ")
            if res[0]["related_resource_id"]:
                res[0]["related_resources"] = self.get_resources_from_list(res[0]["related_resource_id"])
            else:
                res[0]["related_resources"] = []
            retlist["status"] = "OK"
            retlist["detail"] = res[0]
        else:
            retlist["status"] = "NOT_OK"
        return retlist

    def get_letter_details(self, id):
        retlist = {}
        res = self.exec("SELECT `year`, `month`, `day`, `standard_gregorian_date`, `calendar_of_date_provided`, `date_as_marked_on_letter`, `date_uncertain`, `notes_on_date`, `author`, `author_emlo_id`, `author_as_marked_in_text`, `author_uncertain`, `notes_on_author_in_relation_to_letter`, `recipient`, `recipient_emlo_id`, `recipient_as_marked_in_text`, `recipient_uncertain`, `notes_on_recipient_in_relation_to_letter`, `origin_name`, `origin_emlo_id`, `origin_as_marked_in_text`, `origin_uncertain`, `notes_on_origin_in_relation_to_letter`, `destination_name`, `destination_emlo_id`, `destination_as_marked_in_text`, `destination uncertain`, `notes_on_destination_in_relation_to_letter`, `abstract`, `keywords`, `languages`, `incipit`, `explicit`, `people_mentioned`, `emlo_ids_of_people_mentioned`, `notes_on_people_mentioned`, `original_catalogue_name`, `source`, `matching_letters`, `match_id`, `related_resource_ids`, `general_notes_for_public_display`, `emlo_url` FROM `work` WHERE emlo_letter_id =" + str(id))
        if len(res) > 0:
            retlist["status"] = "OK"
            retlist["detail"] = res[0]
        else:
            retlist["status"] = "NOT_OK"
        return retlist

    def exec(self, sql):
        connection_object = self.connection_pool.get_connection()
        json_data=[]
        if connection_object.is_connected():
            cursor = connection_object.cursor()
            cursor.execute(sql)
            rv = cursor.fetchall()
            row_headers=[x[0] for x in cursor.description]
            for result in rv:
                json_data.append(dict(zip(row_headers,result)))
            cursor.close()
            connection_object.close()
        return json_data

    def get_resources_from_list(self, str):
        if str == "":
            return []
        else:
            ids = str.replace(";", ",")
            result = self.exec("SELECT `name`, `details`, `url` FROM `resource` WHERE resource_id IN (" + ids + ")")
            return result

    def count_letters(self, field, value):
        result = self.exec("SELECT COUNT(*) AS amount FROM works WHERE " + field + " = '" + value + "'")
        return result[0]["amount"]
from tests.base import BaseTestCase


class TestGetSensorData(BaseTestCase):

    def test_get_sensor_is_successfull(self):
        response = self.get_delete_response('fend:sensor')
        self.assertEqual(200, response.status_code)

    def test_get_single_sensor_is_successfull(self):
        response = self.get_delete_response('fend:current')
        self.assertEqual(200, response.status_code)
